from math import e

def generateMap():
    s = input(">")
    l = []
    n = 1
    for i in range(0,len(s)):
        if s[i]=="n":
            l.append(n)
            n+=1
        else:
            l.append(0)
    return l

l = generateMap()
print(l)