How to error404 (located in error404 folder)

The exact process may vary depending on the web server you are using. Here are general steps to follow:

Save your custom error404 page as an HTML file, e.g., "error404.html". Make sure it is ready and properly designed.

Access your web server's configuration files. For example, if you are using Apache, you may need to locate the .htaccess file in the root directory of your website. 
If you are using Nginx, you may need to modify the server block configuration file.

Open the configuration file in a text editor and locate the section for error handling or error pages.

Add or modify the directive for the 404 error page to point to your custom error404 HTML file. 
The exact directive and syntax may vary depending on your web server. 
Here are examples for Apache and Nginx:

For Apache:

ErrorDocument 404 /error404/error404.html


For Nginx:

error_page 404 /error404/error404.html;

Save the changes to the configuration file and restart your web server for the changes to take effect.

After completing these steps, when a 404 error occurs on your website, the web server will serve your custom error404 page instead of the default 404 error page. 
Make sure to test it by deliberately visiting a non-existent page on your website to verify that your custom error404 page is displayed correctly.

--RedFox was here