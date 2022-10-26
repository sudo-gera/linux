#include <stdio.h>
#include <stdlib.h>

int main(int argc,char**argv){
    char*a=(char*)calloc(1,argc+1);
    a-=1;
    for (int w=1;w<argc;++w){
        a[w]=atoi(argv[w]);
    }
    a+=1;
    FILE* pipe=popen(a,"r");
    int c;
    while((c=fgetc(pipe))!=EOF){
        printf("%i ",c);
    }
    pclose(pipe);
}
