import { NextPage } from "next";

export type RolesType = {
  isUser?: boolean;
  isAdmin?: boolean;
};

export type NextPageAuth<P = {}> = NextPage<P> & RolesType;

export type ComponentAuthFieldsType = {
  Component: RolesType;
};
