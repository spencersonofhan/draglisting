# from http.server import HTTPServer, BaseHTTPRequestHandler
# from mimetypes import guess_type


# class Server(BaseHTTPRequestHandler):
#     def do_GET(self):
#         user_path = self.path
#         if user_path == '/' or user_path == '/index':
#             self.send_response(301)
#             self.send_header("Location", "index.html")
#             self.end_headers()

#         elif user_path == '/index.html':   # These cases take the user to the home (index) page
#             self.sendDefaultHeaders("index.html")
#             f = open("index.html", "rb")
#             self.wfile.write(f.read())
#             f.close()

#         elif user_path == '/page.css':
#             self.sendDefaultHeaders("page.css")
#             f = open("page.css", "rb")
#             self.wfile.write(f.read())
#             f.close()

#         elif user_path.endswith("jpg") or user_path.endswith("gif") or user_path.endswith("png"):
#             self.sendDefaultHeaders(user_path[1:])
#             f = open(user_path[1:], "rb")
#             self.wfile.write(f.read())
#             f.close()

#         elif user_path == '/favicon.ico':
#             self.sendDefaultHeaders("favicon.ico")
#             f = open("favicon.ico", "rb")
#             self.wfile.write(f.read())
#             f.close()

#         elif user_path == "/debugging":
#             headers = self.sendDefaultHeaders()
#             debug = f"""
#             <html>
#                 <head>
#                     <title>debugging</title>
#                     <meta charset="utf-8">
#                     <link rel="stylesheet" href="page.css"/>
#                 </head>
#                 <body>
#                     <h3><a href="index.html">Home</a></h3>
#                     <h3>Server Version:  {self.server_version}</h3>
#                     <h3>Date:  {self.date_time_string()}</h3>
#                     <h3>IP Address: {self.client_address[0]} |  Port: {self.client_address[1]}</h3>
#                     <h3>Path: \"{self.path}\"</h3>
#                     <h3>Command:  {self.command}</h3>
#                     <h3>Request Version:  {self.request_version}</h3>
#                     <ol>
#                         <li>{headers[0]}</li>
#                         <li>{headers[1]}</li>
#                         <li>{headers[2]}</li>
#                         <li>{headers[3]}</li>
#                     </ol>
#                 </body>
#             </html>
#             """
#             self.wfile.write(bytes(debug, "utf-8"))

#         else:
#             self.send_response(404)
#             error = b"""
#             <html>
#                 <head>
#                     <title>Error 404</title>
#                     <meta charset="utf-8">
#                     <link rel="stylesheet" href="page.css"/>
#                 </head>
#                 <body>
#                     <h3>
#                     <a href="index.html">Home</a>
#                     </h3>
#                     <h1>
#                     ERROR 404: PAGE NOT FOUND
#                     </h1>
#                     <h3>
#                     Sorry chief but this ones on you
#                     </h3>
#                 </body>
#             </html>
#             """
#             self.wfile.write(b"HTTP/1.1 200 OK\r\n\r\n")
#             self.wfile.write(error)

#     def sendDefaultHeaders(self, content=""):
#         headers = []
#         headers.append(b"Server: " + bytes(self.server_version, "utf-8") + b"\r\n")
#         headers.append(b"Date: " + bytes(self.date_time_string(), "utf-8") + b"\r\n")
#         headers.append(b"Connection: close\r\n")
#         headers.append(b"Cache-Control: max-age=1\r\n")

#         if content != "":
#             headers.append(b"Content-Type: " + bytes(guess_type(content)[0], "utf-8") + b"\r\n")
#             test = open(content, "rb")
#             headers.append(b"Content-Length: " + bytes(str(len(test.read())), "utf-8") + b"\r\n")
#             test.close()

#         self.wfile.write(b'HTTP/1.1 200 OK\r\n')
#         for header in headers:
#             self.wfile.write(header)
#         self.wfile.write(b"\r\n")
#         return headers


# if __name__ == '__main__':
#     server_address = ('localhost', 8000)
#     print(f"Serving from http://{server_address[0]}:{server_address[1]}")
#     print("Press Ctrl-C to quit\n")
#     HTTPServer(server_address, Server).serve_forever()
