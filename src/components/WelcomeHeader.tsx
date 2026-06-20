interface WelcomeHeaderProps {
    pokemonId: number | null;
}

export default function WelcomeHeader({ pokemonId }: WelcomeHeaderProps) {
    if (!pokemonId) return null;

    return (
        <>
            <pre className="ascii-banner">
                {`      _  ___ _   _
     | |/ (_) |_| |_ _  _
     | ' <| |  _|  _| || |
     |_|\\_\\_|\\__|\\__|\\_, |
                     |__/`}
            </pre>

            <div className='pokemon-sprite-container'>
                <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemonId}.gif`}
                    alt='random-pokemon'
                    className='pokemon-sprite'
                />
            </div>
        </>
    );
}
