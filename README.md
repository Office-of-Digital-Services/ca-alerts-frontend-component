# CA Alerts Website Embeddable Code

This is the build source for the ca.gov/alerts web snippet.

## See a demo on your site

To see what this alert will look like on your website, paste this code into your web browser console.

1. Navigate to your website.
1. Open the developer console (`F12` key on Windows, `Cmd + Option + J` on Mac).
1. Paste the code from below in the console line and press enter.

```Javascript
document.head.appendChild(document.createElement('script')).src='https://alert.cdt.ca.gov/sample/sample-alert.js';
```

Once you have dismissed the message in your browser, it won't display again (by design).  You can clear your dismissal in the console with...

```Javascript
localStorage.clear();
```
## Installation

To install the production service on your website, add the following HTML code to your `<HTML><HEAD>` section.
```HTML
<html>
...
<head>
  ...
  <script defer src="https://alert.cdt.ca.gov" crossorigin="anonymous"></script>
  ...
</head>
...
```
## Optional installation

If you don't have access to the `<HTML><HEAD>` section on your site, but you can still place `<SCRIPT>` tags in your content, you can create a Javascript section in the `<BODY>` like this.
```HTML
<html>
...
<body>
  ...
  <script>
      document.head.appendChild(
        Object.assign(document.createElement("script"), {
          src: "https://alert.cdt.ca.gov",
          defer: true,
          crossOrigin: "anonymous"
        })
      );
  </script>
  ...
</body>
...
```
