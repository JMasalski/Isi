# Napisz program, który szuka określonego ciągu znaków w łańcuchu znakowym i zwraca indeksy
# wszystkich wystąpień ciągu lub -1, gdy nie ma takiego ciągu.
# Hint: skorzystaj z funkcji split().

def znajdzZnaki(ciag,szukane):
    if szukane not in ciag:
        return "Nie ma takiego znaku"
    podzial = ciag.split(szukane)
    indeksy = []
    start = 0
    for fragment in podzial[:-1]:
        indeksy.append(start + len(fragment))
        start += len(fragment) + len(szukane)

    return indeksy

if __name__ == "__main__":
    ciag = input("Wprowadz ciag znaków\n")
    szukana = input("Wprowadz szukana\n")
    print(f"Szukana: {szukana} znajduje sie na pozycji: {znajdzZnaki(ciag, szukana)}")