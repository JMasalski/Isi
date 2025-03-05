def fun14():
    licznik =0
    for i in range(1,101):
        if (i%3==0 and i%4==0):
            print(i)
            licznik+=1
    print(f"Ilosc: {licznik}")


if __name__=='__main__':
    fun14()