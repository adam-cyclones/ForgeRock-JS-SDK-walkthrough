from http.server import HTTPServer, SimpleHTTPRequestHandler
import ssl

httpd = HTTPServer(('localhost', 8088), SimpleHTTPRequestHandler)

httpd.socket = ssl.wrap_socket (httpd.socket,
        keyfile="./adam-sdk.app+1-key.pem",
        certfile='./adam-sdk.app+1.pem', server_side=True)

httpd.serve_forever()
