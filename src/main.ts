// In questo esercizio, utilizzerai async/await per creare la funzione getChefBirthday(id). Questa funzione accetta un id di una ricetta e deve:
// Recuperare la ricetta da https://dummyjson.com/recipes/{id}
// Estrarre la proprietà userId dalla ricetta
// Usare userId per ottenere le informazioni dello chef da https://dummyjson.com/users/{userId}
// Restituire la data di nascita dello chef
// Note del docente
// Scrivi la funzione getChefBirthday(id), che deve:
// Essere asincrona (async).
// Utilizzare await per chiamare le API.
// Restituire una Promise con la data di nascita dello chef.
// Gestire gli errori con try/catch
// Esempio di utilizzo
// getChefBirthday(1)
//   .then(birthday => console.log("Data di nascita dello chef:", birthday))
//   .catch(error => console.error("Errore:", error.message));
// Esempio di output atteso
// Data di nascita dello chef: 1990-06-15
// Data di nascita dello chef: 1990-06-15

type Recipe = {
  userId: number;
};

type Chef = {
  birthDate: string;
};

async function getChefBirthday(id: number): Promise<string> {
  try {
    // Recupera la ricetta
    const recipeResponse = await fetch(`https://dummyjson.com/recipes/${id}`);
    if (!recipeResponse.ok) {
      throw new Error("Errore nel recupero della ricetta");
    }

    const recipe = (await recipeResponse.json()) as Recipe;

    if (!recipe.userId) {
      throw new Error("userId non trovato nella ricetta");
    }

    // Recupera lo chef
    const chefResponse = await fetch(`https://dummyjson.com/users/${recipe.userId}`);
    if (!chefResponse.ok) {
      throw new Error("Errore nel recupero dello chef");
    }

    const chef = (await chefResponse.json()) as Chef;

    if (!chef.birthDate) {
      throw new Error("Data di nascita dello chef non trovata");
    }

    return chef.birthDate;

  } catch (error: any) {
    throw new Error(`Errore: ${error.message}`);
  }
}

// Esempio di utilizzo
getChefBirthday(1)
  .then(birthday => console.log("Data di nascita dello chef:", birthday))
  .catch(error => console.error("Errore:", error.message));


