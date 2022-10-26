argv=arg
f1=io.open(argv[1],"w+")
f2=io.open(argv[2],"w+")
len=tonumber(argv[3])
w=0
io.output(f1);
data='+'
data=data..data..data..data
data=data..data..data..data
data=data..data..data..data
data=data..data..data..data
data=data..data..data..data
data=data..data..data..data
for w=0,len,4096 do
    io.write(data);
end
f1:seek("set",0);
io.input(f1)
io.output(f2)
w=0
while (w+4096<=len) do
    data=io.read(4096)
    io.write(data)
    w=w+4096
end
if (w<len) then
    data=io.read(len-w)
    io.write(data)
end
io.close(f1)
io.close(f2)