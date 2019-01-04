import React from "react";
import { Typography } from "@material-ui/core";
import PageWithBack from "../page/PageWithBack";
import css from "./notFoundPage.module.css";

type NotFoundPageProps = {};

const NotFoundPage = ({  }: NotFoundPageProps) => (
  <PageWithBack>
    <Typography gutterBottom variant="h2">
      404
    </Typography>
    <div className={css.subtitle}>Page not found.</div>
  </PageWithBack>
);

export default NotFoundPage;
