def checkIsDigit(wej: str):
    return wej[0].isdigit()

def checkIsDig(wej: str):
    try:
        wej = int(wej[0])
        return isinstance(wej, int)
    except ValueError:
        return False


if __name__ == '__main__':
    wej = input("Podaj znak\n")
    print(f"Wersja isdigit(). Liczba {wej} jest liczbą: {checkIsDigit(wej)} ")
    print(f"Wersja isinstance(). Liczba {wej} jest liczbą: {checkIsDig(wej)} ")
