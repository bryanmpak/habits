"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { ZodError } from "zod";
import { Dialog, DialogContent, DialogHeader } from "../ui/Dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/Tabs";
import { Label } from "../ui/Label";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { InputOTPControlled } from "../InputOTPControlled";
import { useAccountLink } from "@/lib/useAccountLink";
import { accountLinkValidator } from "@/lib/validators/accountLinkValidator";
import { createLink, submitLink } from "@/app/actions/account-link";

interface ServerError extends Error {
  message: string;
}

const AccountLinkModal = () => {
  const accountLink = useAccountLink();
  const [emailValue, setEmailValue] = useState("");
  const [createOtpValue, setCreateOtpValue] = useState("");
  const [submitOtpValue, setSubmitOtpValue] = useState("");
  const { user } = useUser();

  if (!user) {
    return;
  }

  const handleCreate = async () => {
    try {
      const validationResult = accountLinkValidator.parse({
        email: emailValue,
        passcode: createOtpValue,
      });

      const promise = createLink(validationResult);

      toast.promise(promise, {
        loading: "creating link request..",
        success: "link request created",
        error: (err) => {
          if (err instanceof Error) {
            return err.message;
          }
          return "An unknown error occurred";
        },
      });

      setEmailValue("");
      setCreateOtpValue("");

      accountLink.onClose();
    } catch (err) {
      if (err instanceof ZodError) {
        const errors = err.issues.map((issue) => issue.message);
        toast.error(errors.join(", "));
      } else {
        console.error("error creating link:", err);
        toast.error("An unknown error occurred");
      }
    }
  };

  // TODO: this is pretty cool, implement multi-faceted error msg
  const handleSubmit = async () => {
    const handleError = (err: ServerError) => {
      if (err.message === "incorrect passcode") {
        return "incorrect passcode.";
      } else if (
        err.message === "request not found or you're not the intended recipient"
      ) {
        return "account link may have been an incorrect email address";
      } else {
        return "an error occurred, please try again";
      }
    };

    try {
      const promise = submitLink(
        user.primaryEmailAddress?.emailAddress as string,
        submitOtpValue
      );

      toast.promise(promise, {
        loading: "submitting link request..",
        success: () => {
          accountLink.onClose();
          setSubmitOtpValue("");
          return "account linked";
        },
        error: (err: ServerError) => handleError(err),
      });
    } catch (err) {
      console.error("error submitting link:", err);
      toast.error("link submit error");
    }
  };

  return (
    <Dialog open={accountLink.isOpen} onOpenChange={accountLink.onClose}>
      <DialogContent className="text-white px-10 border-neutral">
        <DialogHeader className="border-b border-shadow pb-3">
          <h2 className="font-medium text-lg">link to account</h2>
        </DialogHeader>
        <Tabs defaultValue="create">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="create">create link</TabsTrigger>
            <TabsTrigger value="submit">submit link</TabsTrigger>
          </TabsList>
          <TabsContent value="create">
            <div className="pt-4 flex flex-col gap-y-4">
              <div className="flex flex-col space-y-4">
                <Label>partner&apos;s account email </Label>
                <Input
                  className="h-10 px-2 focus-visible:ring-transparent border-neutral hover:border-title focus-within:border-title"
                  type="email"
                  placeholder="enter email address here..."
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-4">
                <Label>input passcode</Label>
                <div className="flex justify-center">
                  <InputOTPControlled
                    otpValue={createOtpValue}
                    setOtpValue={setCreateOtpValue}
                  />
                </div>
              </div>
              <Button className="bg-title text-nav_bg" onClick={handleCreate}>
                create link
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="submit">
            <div className="pt-4 flex flex-col gap-y-4">
              <div className="flex flex-col space-y-4">
                <Label>input passcode</Label>
                <div className="flex justify-center">
                  <InputOTPControlled
                    otpValue={submitOtpValue}
                    setOtpValue={setSubmitOtpValue}
                  />
                </div>
              </div>
              <Button onClick={handleSubmit}>submit link</Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AccountLinkModal;
