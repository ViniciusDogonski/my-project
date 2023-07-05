import React, { useEffect, useState } from 'react';

import './App.css';

import Findings from './components/Findings';

//import { getAll, getById } from './scriptTypeScript';

import { Quote } from './quotes';

function App() {


  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [quotesFilter, setQuotesFilter] = useState<Quote[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    // const filteredQuotes = filterQuotesBySubstring(quotes, event.target.value.toLowerCase());
    // console.log(filteredQuotes);
    // setQuotesFilter(filteredQuotes)
  };


  useEffect(() => {
    fetchQuotes()
      .then((fetchedQuotes) => {
        setQuotes(fetchedQuotes);
        setQuotesFilter(fetchedQuotes);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  async function fetchQuotes(): Promise<Quote[]> {
    const response = await fetch('https://dummyjson.com/quotes'); // Substitua 'URL_DA_API' pela URL real da sua API
    const data = await response.json();

    // Verifica se a resposta da API foi bem-sucedida
    if (!response.ok) {
      throw new Error('Erro ao obter as citações da API.');
    }

    const quotes: Quote[] = data.quotes; // Supondo que o array de citações esteja em 'data.quotes'
    return quotes;
  }


  function filterQuotesBySubstring(quotes: Quote[], substring: string): Quote[] {
    return quotes.filter((quote) => {

      if (quote.author.toLowerCase().includes(substring) || quote.quote.toLowerCase().includes(substring)) {

        return true
      }

    });
  }




  return (

    <div>
      <div className="flex justify-center items-center md:px-10 min-h-screen bg-[#dae4ea]">
        <div className="w-96 my-12 h-auto bg-[#f2f9fb] transition-all rounded-lg  md:w-full p-4">
          <div className="relative">
            <input className="w-full h-12 text-sm outline-none border mt-3 rounded-lg transition-all pl-7 pr-20 focus:border-blue-600" type="text" placeholder="Pesquisar" onChange={handleSearchChange} />
            <button className="absolute right-2 rounded-lg cursor-pointer transition-all top-4 h-10  text-white text-sm"
              onClick={() => {

                const filteredQuotes = filterQuotesBySubstring(quotes, searchTerm.toLowerCase());
                console.log(filteredQuotes);
                setQuotesFilter(filteredQuotes)
              }}>
              <svg className="w-6 h-6 text-gray-400" viewBox="0 0 24 24"
                stroke="currentColor" fill="none"
              >
                <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
                <circle cx="10" cy="10" r="7" />
                <line x1="21" y1="21" x2="15" y2="15" />
              </svg>
            </button>
          </div>

          {quotesFilter.length > 0 ? (
            quotesFilter.map((quote) => (
              <Findings id={quote.id} author={quote.author} quote={quote.quote} key={quote.id} />
            ))
          ) : (
            <div className="md:flex md:justify-center md:flex-wrap gap-6">
              <div className="w-full h-100 p-3 border bg-white mt-7 rounded-lg md:w-85">
                <p className="text-lg font-semibold mt-1 text-center">Não foi possivel achar sua Pesquisa</p>
              </div>
            </div>
          )}



        </div>


      </div>
      <footer className="text-center py-8 text-grey-dark">
        <p> Feito por: Vinicius Augusto Dogonski</p>
        <p>
          TECNOLOGIAS PARA INTERFACES DE APLICAÇÕES WEB
        </p>
        <p>2023</p>
      </footer>
    </div>
  );
}

export default App;
