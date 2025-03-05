def fun15():
    tab= []
    for i in range(1,101):
        if(i % 3 == 0 or i % 5 == 0):
            tab.append(i)
    return tab

if __name__ == '__main__':
    print(fun15())
