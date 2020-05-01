import {
  AfterData,
  AfterRoot,
  AfterScripts,
  AfterStyles,
  useAfterContext,
} from "@jaredpalmer/after";
import * as React from "react";

function Document(props) {
  const { helmet } = props;
  const htmlAttrs = helmet.htmlAttributes.toComponent();
  const bodyAttrs = helmet.bodyAttributes.toComponent();

  return (
    <html {...htmlAttrs}>
      <head>
        <Preload />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        <AfterStyles />
      </head>
      <body {...bodyAttrs}>
        <AfterRoot />
        <AfterData />
        <ModuleNomodule />
        <Polyfills />
        <AfterScripts />
      </body>
    </html>
  );
}

Document.getInitialProps = async function ({ renderPage }) {
  const page = await renderPage();

  return page;
};

function ModuleNomodule() {
  // Fix for Safari 10.1
  //https://gist.github.com/samthor/64b114e4a4f539915a95b91ffd340acc
  return (
    <script
      noModule
      dangerouslySetInnerHTML={{
        __html: `!function(){var e=document,t=e.createElement("script");if(!("noModule"in t)&&"onbeforeload"in t){var n=!1;e.addEventListener("beforeload",function(e){if(e.target===t)n=!0;else if(!e.target.hasAttribute("nomodule")||!n)return;e.preventDefault()},!0),t.type="module",t.src=".",e.head.appendChild(t),t.remove()}}();`,
      }}
    ></script>
  );
}

function isJS(str) {
  return str.endsWith(".js");
}

function Polyfills() {
  const { assets } = useAfterContext();
  const polyfill = assets.polyfills.js;
  return polyfill ? (
    <script
      src={polyfill}
      noModule
      defer
      type="text/javascript"
      crossOrigin="anonymous"
    />
  ) : null;
}

function Preload() {
  const { assets, scripts, styles } = useAfterContext();
  return (
    <>
      {assets.client.css && (
        <link rel="preload" href={assets.client.css} as="style" />
      )}
      {styles.map((path) => (
        <link key={path} rel="preload" href={path} as="style" />
      ))}
      {scripts.filter(isJS).map((path) => (
        <link
          key={path}
          rel="preload"
          href={path}
          as="script"
          crossOrigin="anonymous"
        />
      ))}
      {assets.client.js && (
        <link
          href={assets.client.js}
          rel="preload"
          as="script"
          crossOrigin="anonymous"
        />
      )}
    </>
  );
}

export default Document;
