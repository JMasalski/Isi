import random
def fun20():
    liczba = random.randint(1,101)
    # print(f"liczba do zgadnięcia(w celach testowych): {liczba}")
    while True:
        zgadywana = int(input("Zgadywana liczba: "))
        if liczba == zgadywana:
            print("Brawo zgadłeś liczbe")
            break
        if liczba < zgadywana:
            print("Mniejsza")
        if liczba > zgadywana:
            print("Wieksza")

if __name__ == '__main__':
    fun20()