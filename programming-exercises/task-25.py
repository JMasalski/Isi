import requests
from bs4 import BeautifulSoup

url = 'https://www.otomoto.pl/osobowe/mercedes-benz/g-klasa'

# Nagłówki, które symulują przeglądarkę internetową ~ ChatGPT
# Bez tego błąd 403
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

response = requests.get(url, headers=headers)

# Sprawdzenie, czy pobranie się powiodło
if response.status_code == 200:
    soup = BeautifulSoup(response.text, 'html.parser')
    for link in soup.find_all('a'):
        print(link.get('href'))
    # Przetwarzanie zawartości strony
else:
    print(f"Strona nie została załadowana, kod statusu: {response.status_code}")
