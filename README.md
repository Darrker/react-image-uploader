
[demo]: http://image-uploader.taureca.com/

# React Image uploader

## Eng

English description will be soon! Dont worry, you shall scroll down and look at some gifs! :)

Try [DEMO][demo] and see what it can do :)



## PL


#### Zobacz [DEMO][demo]

Uploader zdjęć z możliwością sortowania usuwania ich.
Zdjęcia są wysłane na zewnętrzny serwer gdzie wracają do uploadera w formie już wygenerowanych urli. 

**Zdjęcia można sortować i usuwać do woli! Złap miniaturkę i przeciągnij w odpowiednie dla Ciebie miejsce! :)**

![error](/readme_assets/1.gif)

Sortowanie na urządzeniach mobilnych jest zrealizowane za pomocą menu, które pomoga przestawić pozycje zdjęć?  

![error](/readme_assets/2.gif)

### Dlaczego tak? 

Przedewszystkim wygoda, ciężko będzie przeciągać palcem i sortować miniaturki.
Ale to nie wszystko - wydajność też ma znaczenie.

### Obsługa błędów

Jeśli wybierzesz niepoprawny typ pliku, bądź z serwerem będzie coś nie tak. Nie martw się, aplikacja nie wybuchnie! :)
Natychmiast pojawi się odpowiedni alert informujący Cię o problemie.

![error](/readme_assets/error.jpg)

### Jak użyć? 
      <ImageUploader
            requestURL={}
            requestDataName={}
            imageData={}
      />
> 
* requestURL – Url do zewnetrznego serwera
* requestaDataName – nazwa pola FormData dla zewnetrzengo serwera
* imageData – Zdarzenie w którym otrzymujemy posortowane piliki typu FileList ze zdjęciami

#### Autor: Radosław Makosz