# Napisz program, który sprawdza czy wczytany łańcuch znakowy jest liczbą lub nie. Muszą być wczytane co najmniej dwa znaki.
# Hint: skorzystaj z funkcji all().

def checkIsDigList(wej):
    if len(wej) < 2:
        return "Za krótki ciąg znaków"
    return all(char.isdigit() for char in wej)

if __name__ == '__main__':
    wejscie = input("Wprowadz ciag znakow\n")
    print(f"Jest liczba: {checkIsDigList(wejscie)}")
