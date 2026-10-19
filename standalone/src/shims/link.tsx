import React from "react";
import { navigate } from "./navigation";

export default function Link({ href, children, onClick, target, ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const internal = href.startsWith("/");
  const go = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (!internal || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || target === "_blank") return;
    e.preventDefault();
    navigate(href);
  };
  return <a href={href} target={target} onClick={go} {...rest}>{children}</a>;
}
