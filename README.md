# CA Alerts Website Embeddable Code

This is the build source for the ca.gov/alerts web snippet.

To see what this alert will look like on your website, paste this code into your web browser console.

1. Navigate to your website.
1. Open the developer console (`F12` key on Windows, `Cmd + Option + J` on Mac).
1. Paste the code from below in the console line and press enter.

```Javascript
document.head.appendChild(document.createElement('script')).src='https://calerts.azurewebsites.net';
```

To install the service on your website, add the following HTML code to your page.

```HTML
<head>
  ...
  <script defer src="https://calerts.azurewebsites.net"></script>
  ...
</head>
```