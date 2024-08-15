import { auth } from "@clerk/nextjs/server";
import { User } from "@prisma/client";

type Completion = {
  date: string;
  isIncluded: boolean;
  isComplete: boolean;
  dayOfWeek: string;
};

type Habit = {
  id: string;
  habitName: string;
  userId: string;
  color: string;
  completions: Completion[];
};

type Props = {
  users: Pick<User, "userId" | "name" | "linkedUserId">[];
  habits: Habit[];
};

const Calendar = async ({ users, habits }: Props) => {
  const { userId } = auth();
  if (!userId) {
    return;
  }

  const mainUser = users.find((user) => user.userId === userId);
  const linkedUser = users.find(
    (user) => user.userId === mainUser?.linkedUserId
  );

  const datesEl = habits[0].completions.map((completion, i) => (
    <div
      key={i}
      className="grid grid-cols-[auto,1fr] gap-2 items-center w-16 h-4"
    >
      <div className="w-9 text-text text-xs whitespace-nowrap">
        {new Date(completion.date).toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
        })}
      </div>
      <div className="text-text text-[8px] uppercase">
        {completion.dayOfWeek.slice(0, 3)}
      </div>
    </div>
  ));

  const isIncludedCSS = "w-[2px] h-[2px] rounded-full bg-title";
  const isNotIncludedCSS = "w-[2px] h-[2px] rounded-full bg-light";

  const renderHabits = (userHabits: Habit[]) =>
    userHabits.map((habit) => (
      <div key={habit.id} className="flex flex-col gap-1">
        {habit.completions.map((completion, i) => (
          <div key={i} className="w-4 h-4 flex justify-center items-center">
            {completion.isIncluded ? (
              completion.isComplete ? (
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: habit.color }}
                ></div>
              ) : (
                <div className={isIncludedCSS}></div>
              )
            ) : (
              <div className={isNotIncludedCSS}></div>
            )}
          </div>
        ))}
      </div>
    ));

  const mainUserHabits = habits.filter((habit) => habit.userId === userId);
  const linkedUserHabits = linkedUser
    ? habits.filter((habit) => habit.userId === linkedUser.userId)
    : [];

  return (
    <div className="flex gap-6">
      <div className="flex flex-col gap-1">
        <div className="h-4"></div>
        {datesEl}
      </div>
      <div className="flex gap-8">
        <div className="flex flex-col gap-1 items-center">
          <p className="text-text text-xs underline decoration-shadow">
            {mainUser?.name || "Main User"}
          </p>
          <div className="flex gap-1">{renderHabits(mainUserHabits)}</div>
        </div>

        {linkedUser && (
          <div className="flex flex-col gap-1 items-center">
            <p className="text-text text-xs underline decoration-shadow">
              {linkedUser.name}
            </p>
            <div className="flex gap-1">{renderHabits(linkedUserHabits)}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
