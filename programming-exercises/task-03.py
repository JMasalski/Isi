# Napisz program, który szuka określonego ciągu znaków w łańcuchu znakowym i zwraca indeks pierwszego wystąpienia ciągu lub -1,
# gdy nie ma takiego ciągu.
# Hint: skorzystaj z funkcji find().

def znajdzCiag(ciag, szukana):
    if ciag.find(szukana) == -1:
        return "Nie ma takiego znaku"
    return ciag.find(szukana)


if __name__ == "__main__":
    ciag = input("Wprowadz ciag znaków\n")
    szukana = input("Wprowadz szukana\n")
    print(f"Szukana: {szukana} znajduje sie na pozycji: {znajdzCiag(ciag, szukana)}")
