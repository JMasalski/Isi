def checkIsDigit(wej: str):
    return wej[0].isdigit()

def checkIsDig(wej: str):
    return isinstance(wej, int)

if __name__ == '__main__':
    wej = input("Podaj znak\n")
    print(f"Wersja isdigit(). Jest liczbą: {checkIsDigit(wej)} ")
    print(f"Wersja isinstance(). Jest liczbą: {checkIsDig(wej)} ")
