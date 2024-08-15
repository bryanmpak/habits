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

  const datesEl = habits[0].completions.map((completion, i) => (
    <div key={i} className="flex gap-2">
      <div className="h-4 text-text text-xs text-center">
        {new Date(completion.date).toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
        })}
      </div>
      <div className="h-4 text-text text-[8px] leading-loose">
        {completion.dayOfWeek}
      </div>
    </div>
  ));

  console.log(datesEl.length);
  const isIncludedCSS = "w-[2px] h-[2px] rounded-full bg-title";
  const isNotIncludedCSS = "w-[2px] h-[2px] rounded-full bg-light";

  const mainUserHabitsEl = habits
    .filter((habit) => habit.userId === userId)
    .map((habit) => (
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

  console.log();

  return (
    <div className="flex gap-6">
      <div className="flex flex-col gap-1 items-center">
        <div className="h-4"></div>
        {datesEl}
      </div>
      <div className="flex gap-8">
        <div className="flex flex-col gap-1 items-center">
          <p className="text-text text-xs underline decoration-shadow">
            {users[0].name}
          </p>
          <div className="flex gap-1">{mainUserHabitsEl}</div>
        </div>

        {/* <div className="flex flex-col gap-1 items-center">
          <p className="text-text text-xs underline decoration-shadow">
            {linkedUser[0].name}
          </p>
          <div className="flex gap-1">{linkedUserHabitsEl}</div>
        </div> */}
      </div>
    </div>
  );
};

export default Calendar;
