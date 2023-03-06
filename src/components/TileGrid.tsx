import Image from "next/image";
import React, { useState } from "react";


type TileGridProp<T> = {
    tileData: Array<T>,
    setTileData: Function
    createTile: Function
}

const TileGrid = <T>({tileData, setTileData, createTile}: TileGridProp<T>) => {
        
    // should be initialized with single addTile
    const testArr = [{name: 'Note_A', url: '/url', test: 1, fileIcon: null, lastModified: Date()},
                     {name: 'Note_B', url: '/url', test: 2, fileIcon: null, lastModified: Date()},];

    return (
        <div className="mt-3 grid gap-3 pt-3 text-center md:grid-cols-4">
            {tileData.map((tile) => (
                <div> {createTile(tile)}</div>) )
            }
        </div>
    );
}

export default TileGrid;