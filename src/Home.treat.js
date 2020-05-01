import { style } from "treat";

export const homeStyle = style({
  textAlign: "center",
});

export const headerStyle = style({
  backgroundColor: "#222",
  color: "#fff",
  padding: "80px 20px",
  margin: 0,
});

export const linkStyle = style({
  color: "#222",
  textDecoration: "none",
  selectors: {
    "&:hover": {
      textDecoration: "underline",
    },
  },
});
