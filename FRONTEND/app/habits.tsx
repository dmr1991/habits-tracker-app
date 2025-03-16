type Habits = {
  title: string;
  description: string;
};

type HabitsProps = {
  habits: Habits[];
};
export default function Habits({ habits }: HabitsProps) {
  return (
    <div className="p-4 bg-rose-300 divide-y divide-white w-150 rounded-2xl shadow-lg">
      {habits.map((habit) => (
        <div key={habit.title} className="p-4 m-2 list-none text-white">
          <li className="text-lg font-semibold text-white">{habit.title}</li>
          <p>{habit.description}</p>
          <progress
            className="w-24 h-4 rounded-lg"
            value="70"
            max="100"
          ></progress>
          <button className="border-rose-200 text-rose-50 bg-rose-300 hover:border-transparent hover:bg-rose-400 hover:text-white active:bg-rose-700 rounded-md p-2 m-2">
            Mark as Done
          </button>
        </div>
      ))}
    </div>
  );
}
