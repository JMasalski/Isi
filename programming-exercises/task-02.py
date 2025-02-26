def checkIsDigList(wej):
    if len(wej) < 2:
        return "Za krótki ciąg znaków"
    return all(char.isdigit() for char in wej)

if __name__ == '__main__':
    wejscie = input("Wprowadz ciag znakow\n")
    print(f"Jest liczba: {checkIsDigList(wejscie)}")
