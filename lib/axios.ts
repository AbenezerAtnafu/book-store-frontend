"use client";

import Axios from "axios";

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsInVzZXJuYW1lIjoiYWJlbmUiLCJpYXQiOjE3MDc2ODIyMDYsImV4cCI6MTc5NDA4MjIwNn0.QH2aRIdQDkQ_qkMQ67qmLMftYFHmDsMx0GeCwJAqcY8",
    // + localStorage.getItem("token") || "",
  },
});

export default axios;
