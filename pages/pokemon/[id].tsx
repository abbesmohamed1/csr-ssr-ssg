// Copyright 2022 dell
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link';
import React, {useState, useEffect} from 'react'

export async function getStaticPaths() {
    const resp = await fetch("https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json");
    
    const pokemon = await resp.json();
    
    return {
        paths: pokemon.map((pokemon:any)=> ({
            params: { id: pokemon.id.toString() },
        })),
        fallback: false,
    }
}


export async function getStaticProps({params}:any) {
    const resp = await fetch(`https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params.id}.json`);

    return {
        props: {
            pokemon: await resp.json(),
        }
    }
}


// export async function getServerSideProps({params}:any) {
//     const resp = await fetch(`https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params.id}.json`);

//     return {
//         props: {
//             pokemon: await resp.json(),
//         }
//     }
// }


const Details: NextPage = ({pokemon}: any) =>{

    const {query: { id },} = useRouter();

    
//   const [pokemon, setPokemon] = useState<any>(null)

//   useEffect(() => {
//     async function getPokemon() {
//       const resp = await fetch(`https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${id}.json`);
//       setPokemon(await resp.json());
//     }
//     if(id){
//         getPokemon();
//     }
//   }, [id]);




  if(!pokemon){
    return null
  }
  return (
    <div >
        <Head><title>{pokemon?.name}</title></Head>
        <div><Link href="/"><a>Back to home</a></Link></div>
        <div className='grid grid-cols-2 gap-1 p-8'>
            <div>
                <img className='max-h-[400px]' src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon?.image}`} 
                alt={pokemon.name}
                />
            </div>
            <div>
                <div className=''>{pokemon.name}</div>
                <div className=''>{pokemon.type.join(", ")}</div>
                <table>
                    <thead className=''>
                        <tr>
                            <th>Name</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pokemon.stats.map(({name, value}: any) => (
                            <tr key={name}>
                                <td className=''>{name}</td>
                                <td>{value}</td>
                            </tr>
                        ) )}
                    </tbody>
                </table>
            </div>

        </div>
    </div>
  )
}

export default Details