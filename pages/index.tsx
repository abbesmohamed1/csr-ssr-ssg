import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link';
import React, {useState, useEffect} from 'react'



// ----------------- this is the CSR SERVER SIDE RENDERING -----------------
  export async function getServerSideProps(){
  const resp = await fetch("https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json");

  return {
    props: {
      pokemon: await resp.json(),
    }
  }
}


const Home: NextPage = ({pokemon}: any) => {

  // ----------------- this is the CSR CLIENT SIDE RENDERING -----------------


  // const [pokemon, setPokemon] = useState<any[]>([])

  // useEffect(() => {
  //   async function getPokemon() {
  //     const resp = await fetch("https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json");
  //     setPokemon(await resp.json());
  //   }
  //   getPokemon();
  // }, []);


  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Pokemon List</title>
      </Head>
      <h2 className=''>Pokemon List</h2>

      <div className='grid grid-cols-4 gap-10'>
        {pokemon.map((pokemon: any,index: any) => (
          <div key={index} className=''>
            <Link href={`/pokemon/${pokemon?.id}`}>
              <a>
                <img src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon?.image}`} alt={pokemon.name} />
                <h5>{pokemon?.name}</h5>
              </a>
            </Link>
          </div>
        ))}  
      </div>
    </div>
  )
}

export default Home
