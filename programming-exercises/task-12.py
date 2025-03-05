def fun12(sentencja:str):
    return sentencja.replace('o','0').replace('e','3').replace('i','1').replace('a','4')

if __name__=='__main__':
    print(fun12(input("Wprowadz sentencje \n")))