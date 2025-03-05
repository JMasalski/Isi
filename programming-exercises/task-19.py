def fun19(sentencja):
    odwrocona_sentencja = sentencja[::-1]
    if odwrocona_sentencja == sentencja:
        print(f"Sentencja '{sentencja}' jest palindromem")
    else:
        print(f"Sentencja '{sentencja}' nie jest palindromem")

if __name__ == "__main__":
    fun19(input("Podaj sentencję: \n").lower())
