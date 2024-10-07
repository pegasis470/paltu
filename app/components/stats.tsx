import { Text } from "@mantine/core";
import classes from "./StatsGroup.module.css";

const data = [
  {
    title: "Rescues",
    stats: "4050+",
    description: "24% more than in the same month last year, 33% more that two years ago",
  },
  {
    title: "Adoptions",
    stats: "2,175",
    description: "13% less compared to last month, new user engagement up by 6%",
  },
  {
    title: "Vaccinations",
    stats: "1,994",
    description: "1994 orders were completed this month, 97% satisfaction rate",
  },
  {
    title: "Sterilizations",
    stats: "1,994",
    description: "1994 orders were completed this month, 97% satisfaction rate",
  },
];

export function StatsGroup() {
  const stats = data.map((stat) => (
    <div key={stat.title} className={classes.stat}>
      <Text c={"blue.4"} className={classes.count}>
        {stat.stats}
      </Text>
      <Text c={"blue.4"} className={classes.title} size="lg">
        {stat.title}
      </Text>
      {/* <Text className={classes.description}>{stat.description}</Text> */}
    </div>
  ));
  return <div className={classes.root}>{stats}</div>;
}
