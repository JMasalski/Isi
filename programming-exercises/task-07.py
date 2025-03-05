from utils.obliczenia import oblicz_pierwiastek,oblicz_silnie,oblicz_logarytm,oblicz_sinus

print("Pierwiastek z 25:", oblicz_pierwiastek(25))
print("Silnia z 5:", oblicz_silnie(5))
print("Logarytm z 8 przy podstawie 2:", oblicz_logarytm(8, 2)) #Domyslna podstawa to logarytm naturalny
print("Sinus 30 stopni (w radianach):", oblicz_sinus(30 * 3.1415926535 / 180))