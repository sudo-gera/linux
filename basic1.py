import termios
import copy
import sys
import time
import threading
from typing import Any
import urllib.request
# from termios import *

def receive_key_event_unsafe():
    # if you will use it in while(1)
    # you will never stop
    # ctrl+C returns as 3
    fd=sys.stdin.fileno()
    mode=termios.tcgetattr(fd)
    save=copy.copy(mode)
    mode[0] &= ~(termios.BRKINT | termios.ICRNL | termios.INPCK | termios.ISTRIP | termios.IXON)
    mode[1] &= ~(termios.OPOST)
    mode[2] &= ~(termios.CSIZE | termios.PARENB)
    mode[2] |= termios.CS8
    mode[3] &= ~(termios.ECHO | termios.ICANON | termios.IEXTEN | termios.ISIG)
    mode[6][termios.VMIN] = 1
    mode[6][termios.VTIME] = 0
    termios.tcsetattr(fd, termios.TCSAFLUSH, mode)
    c=sys.stdin.read(1);
    termios.tcsetattr(fd, termios.TCSADRAIN, save);
    return c;


def receive_key_event():
    k=receive_key_event_unsafe()
    # stop if
    #   ctrl+shift+@ is 0
    #   ctrl+A is 1
    #   ctrl+B is 2
    #   ctrl+C is 3
    #   ctrl+D is 4
    if ord(k[0])<5:
        exit(0)
    return k;

k3={
       1: '\x1b',
       2: '1',
       3: '2',
       4: '3',
       5: '4',
       6: '5',
       7: '6',
       8: '7',
       9: '8',
      10: '9',
      11: '0',
      12: '-',
      13: '=',
      14: '\x7f',
      15: '\t',
      16: 'q',
      17: 'w',
      18: 'e',
      19: 'r',
      20: 't',
      21: 'y',
      22: 'u',
      23: 'i',
      24: 'o',
      25: 'p',
      26: '[',
      27: ']',
      28: '\r',
      30: 'a',
      31: 's',
      32: 'd',
      33: 'f',
      34: 'g',
      35: 'h',
      36: 'j',
      37: 'k',
      38: 'l',
      39: ';',
      40: "'",
      41: '`',
      43: '\\',
      44: 'z',
      45: 'x',
      46: 'c',
      47: 'v',
      48: 'b',
      49: 'n',
      50: 'm',
      51: ',',
      52: '.',
      53: '/',
      57: ' ',
      59: '\x1bOP',
      60: '\x1bOQ',
      61: '\x1bOR',
      62: '\x1bOS',
      63: '\x1b[15~',
      64: '\x1b[17~',
      65: '\x1b[18~',
      66: '\x1b[19~',
      67: '\x1b[20~',
      68: '\x1b[21~',
      87: '\x1b[23~',
      88: '\x1b[24~',
}

k1={
       1:   27, # '\x1b'
       2:   49, # '1'
       3:   50, # '2'
       4:   51, # '3'
       5:   52, # '4'
       6:   53, # '5'
       7:   54, # '6'
       8:   55, # '7'
       9:   56, # '8'
      10:   57, # '9'
      11:   48, # '0'
      12:   45, # '-'
      13:   61, # '='
      14:  127, # '\x7f'
      15:    9, # '\t'
      16:  113, # 'q'
      17:  119, # 'w'
      18:  101, # 'e'
      19:  114, # 'r'
      20:  116, # 't'
      21:  121, # 'y'
      22:  117, # 'u'
      23:  105, # 'i'
      24:  111, # 'o'
      25:  112, # 'p'
      26:   91, # '['
      27:   93, # ']'
      28:   13, # '\r'

      30:   97, # 'a'
      31:  115, # 's'
      32:  100, # 'd'
      33:  102, # 'f'
      34:  103, # 'g'
      35:  104, # 'h'
      36:  106, # 'j'
      37:  107, # 'k'
      38:  108, # 'l'
      39:   59, # ';'
      40:   39, # "'"
      41:   96, # '`'

      43:   92, # '\\'
      44:  122, # 'z'
      45:  120, # 'x'
      46:   99, # 'c'
      47:  118, # 'v'
      48:   98, # 'b'
      49:  110, # 'n'
      50:  109, # 'm'
      51:   44, # ','
      52:   46, # '.'
      53:   47, # '/'



      57:   32, # ' '
}

k2={
       0: [29, 3],
      28: [29, 43],
      29: [29, 27],
      30: [29, 7],
      31: [29, 12],
}
for q,w in k1.items():
    k2[w]=[q]

for q in 'qwertyuiopasdfghjklzxcvbnm':
    q=ord(q)
    k2[q-32]=[42]+k2[q]
    k2[q-96]=[29]+k2[q]

for q,w in zip(
    '1234567890-=[];,./`\'\\',
    '!@#$%^&*()_+{}:<>?~"|'
):
    assert ord(w) not in k2
    k2[ord(w)]=[42]+k2[ord(q)]

for q in range(128):
    assert q in k2
    assert all([w<128 for w in k2[q]])


from http.server import BaseHTTPRequestHandler, HTTPServer
import time
import queue

sq=queue.Queue()

class MyServer(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-type", "text/html; charset=utf-8")
        self.end_headers()
        if self.path=='/stop':
            raise KeyboardInterrupt
        try:
            self.wfile.write(str(sq.get(1,1)).encode())
        except queue.Empty:
            pass
    def log_message(*a):
        pass

def server():
    myServer = HTTPServer(('127.0.0.1', int(sys.argv[1])), MyServer)
    try:
        myServer.serve_forever()
    except KeyboardInterrupt:
        pass
    myServer.server_close()

t=threading.Thread(target=server)
t.start()

while 1:
    c=ord(receive_key_event_unsafe())
    if c<128:
        for q in k2[c]:
            sq.put(q)
            # print(q)
            # sys.stdout.flush()
            # time.sleep(0.1)
        for q in k2[c]:
            sq.put(q+128)
            # print(q+128)
            # sys.stdout.flush()
    else:
        urllib.request.urlopen('http://127.0.0.1:'+sys.argv[1]+'/stop').read()
        t.join()
        exit()


# n=0
# t=time.time()
# k3={}

# while(1):
#     c=receive_key_event()
#     if time.time()-t<0.01:
#         k3[n]+=c
#         print('\x1b[A',end='')
#     else:
#         n+=1
#         k3[n]=c
#     t=time.time()
#     print(f'''                                 ''',end='\r')
#     print(f'''    {n:4}: {repr(k3[n])},''')



