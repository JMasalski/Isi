from datetime import datetime

class Vehicle:
    def __init__(self, nazwa, rok_produkcji, przebieg):
        self.nazwa = nazwa
        self.rok_produkcji = rok_produkcji
        self.przebieg = przebieg

    @property
    def wiek(self):
        return datetime.now().year - self.rok_produkcji

    def is_old(self):
        return self.wiek > 10

    def is_long_mileage(self):
        return self.przebieg > 200000

class Car(Vehicle):
    def __init__(self, nazwa, rok_produkcji, przebieg):
        super().__init__(nazwa, rok_produkcji, przebieg)


vehicle1 = Vehicle("Motocykl Yamaha", 2005, 150000)
car1 = Car("Ford Focus", 2018, 50000)
car2 = Car("BMW X5", 2012, 250000)

print(f"{vehicle1.nazwa} - Wiek: {vehicle1.wiek}, Stary?: {vehicle1.is_old()}, Wysoki przebieg?: {vehicle1.is_long_mileage()}")
print(f"{car1.nazwa} - Wiek: {car1.wiek}, Stary?: {car1.is_old()}, Wysoki przebieg?: {car1.is_long_mileage()}")
print(f"{car2.nazwa} - Wiek: {car2.wiek}, Stary?: {car2.is_old()}, Wysoki przebieg?: {car2.is_long_mileage()}")
