import { RoleToUrlSegment } from "@constants";
import { Session } from "next-auth";
import { Resource, Senior, User } from "@prisma/client";
import moment from "moment";

type PositionOrder = {
  [position: string]: number;
};

export const formatUserHomeRoute = (user: NonNullable<Session["user"]>) => {
  return `/private/${user.id}/${RoleToUrlSegment[user.role]}/home`;
};

/**
 * Compare resource by alphabetical order.
 */
export const compareResource = (x: Resource, y: Resource) => {
  if (x.title > y.title) {
    return 1;
  } else if (x.title < y.title) {
    return -1;
  }
  return 0;
};

/*
 * Compare user fullname by alphabetical order.
 */
export const compareUser = (user1: User, user2: User) => {
  const user1name = fullName(user1);
  const user2name = fullName(user2);
  if (user1name > user2name) {
    return 1;
  } else if (user1name < user2name) {
    return -1;
  } else {
    return 0;
  }
};

export const formatFileDate = (date: Date) =>
  moment(date).format("MMM DD YYYY");

export const fullName = (user: User) => `${user.firstName} ${user.lastName}`;

export const seniorFullName = (senior: Senior) =>
  `${senior.firstname} ${senior.lastname}`;

export const sortedStudents = (students: User[]) => {
  const positionOrder: PositionOrder = {
    "Social Coordinator": 0,
    "Senior Outreach Coordinator": 1,
    "Head of Media": 2,
    Secretary: 3,
    Treasurer: 4,
    "Match Coordinator": 5,
  };

  const comparePositions = (a: User, b: User) => {
    if (a.role === "CHAPTER_LEADER" && b.role !== "CHAPTER_LEADER") {
      return -1;
    }
    if (b.role === "CHAPTER_LEADER" && a.role !== "CHAPTER_LEADER") {
      return 1;
    }

    const orderA = positionOrder[a.position] ?? Infinity;
    const orderB = positionOrder[b.position] ?? Infinity;

    return orderA - orderB;
  };

  return students.sort(comparePositions);
};

/*
 * Compare senior fullname by alphabetical order.
 */
export const compareSenior = (senior1: Senior, senior2: Senior) => {
  const senior1name = seniorFullName(senior1);
  const senior2name = seniorFullName(senior2);
  if (senior1name > senior2name) {
    return 1;
  } else if (senior1name < senior2name) {
    return -1;
  }
  return 0;
};
