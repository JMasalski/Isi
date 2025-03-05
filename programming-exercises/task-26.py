import requests
from bs4 import BeautifulSoup
import csv

class Home:
    def __init__(self, header_name, price, price_for_m2):
        self.header_name = header_name
        self.price = price
        self.price_for_m2 = price_for_m2

    def __repr__(self):
        return f"Home(header_name={self.header_name}, price={self.price}, price_for_m2={self.price_for_m2})"

def fetch_homes():
    url = 'https://www.otodom.pl/pl/wyniki/sprzedaz/mieszkanie/pomorskie/gdynia/gdynia/gdynia?priceMax=600000&viewType=listing'
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }

    response = requests.get(url, headers=headers)

    if response.status_code != 200:
        print(f"Error: {response.status_code}")
        return []

    soup = BeautifulSoup(response.text, 'html.parser')
    print(soup.prettify())
    homes = []

    listings = soup.find_all('article', {'data-cy': "listing-item"})
    for listing in listings:
        header_name = listing.find('p', {'data-cy': 'listing-item-title'}).text.strip() if listing.find('p', {'data-cy': 'listing-item-title'}) else 'Brak tytułu'

        price_tag = listing.find('span', {'class': 'css-2bt9f1 evk7nst0'})  # Sprawdź, czy klasa jest prawidłowa
        if price_tag:
            price = price_tag.text.strip().replace('\xa0', ' ').replace('zł', '').strip()
        print(price)

        price_for_m2_tag = listing.find('dt', string='Cena za metr kwadratowy')
        if price_for_m2_tag:
            price_for_m2 = price_for_m2_tag.find_next('dd').find('span').text.strip().replace('\xa0','')
        home = Home(header_name, price, price_for_m2)
        homes.append(home)

    return homes

def save_to_csv(homes):
    with open('home.csv', mode='w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerow(['header_name', 'price', 'price_for_m2'])

        for home in homes:
            writer.writerow([home.header_name, home.price, home.price_for_m2])

    print("Dane zostały zapisane do pliku home.csv.")

def main():
    homes = fetch_homes()
    homes_dict = {i: home for i, home in enumerate(homes, 1)}

    save_to_csv(homes)

if __name__ == '__main__':
    main()