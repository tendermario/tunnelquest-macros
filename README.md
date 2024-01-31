# Tunnelquest Macros

This is a hack-free system for EverQuest inventory management, designed for people that sell in the tunnel in EC.

Since the Bazaar exists in most version of EverQuest, this is primarily useful in Project1999 Blue/Green servers.

## How it works

This uses data out of raw eq inventory files and turns it into hotkey macros with purple links.

"Purple links" (in-message links to the item with details) are usually only able to be generated by ctrl + clicking on the image of an item. This only puts the item into the text field, and is not usually accessible to macros. There is [prior art][https://wiki.project1999.com/Item_ID_Generator] to wedging a purple link into a macro, which involves editing your macros file.

This system currently requires pasting the output lines into your macros file named something like `Tomnook_P1999Green.ini`.

The location of these files are in `C:\Users\<your home directory>\AppData\Local\VirtualStore\Program Files (x86)\Sony\EverQuest` if you aren't running in Windows XP Compatibility mode, or in `C:\Program Files (x86)\Sony\EverQuest` if you are running `eqgame.exe` in Windows XP Compatibility mode ([which you should be](https://wiki.project1999.com/Tech_Support#Game_Crashing_When_Zoning_or_Camping) if you want to crashing less!)

Exporting your inventory by default will be named something like `Tomnook-Inventory.txt` (or otherwise can be whatever name you type after `/exportfile inventory`).

It's simplest to keep the whole inventory of a mule as sellable inventory, but you are able to deselect item types from the list.

## Instructions

1. Run in EverQuest `/exportfile inventory` on each character you want to export the inventory on.
1. Open Tunnelquest Macros.
1. Select the inventory files.
1. Select which items to skip (like backpacks)
1. Enter prices.
1. Copy the output list into your macros file.

## Reference Conversion

Input file(s) contents:

    Input: Tomnook-inventory.txt
    Slot Name  ID  Quantity
    Bag1 Gloves  0234  1
    Bag1-slot2 A cool sword  11113 1
    Bag1-slot2 Another sword  11114 1
    Bag1-slot2 A sword  11333 1
    Bag1-slot2 Gloves  1222 1
    ...

Output text to be pasted in your macros file:

    Page2Button5Line1=/auc WTS 002fe3000000000000000000000000000000000000000A cool sword | 002fe3000000000000000000000000000000000000000Another sword | 002fe3000000000000000000000000000000000000000A sword
    Page2Button5Line2=/auc WTS 002fe3000000000000000000000000000000000000000Gloves
    ...

## Releases

### 1.1.1

1. Turn this into an electron app
1. Add prices via another input field

### 1.0.0

1. For a given input list, create an output list
1. For an output list, modify it to have only the name and ID
1. For a name and ID, add purple link, ID hex and padding
1. For each purple link, add prefix and delimiter up to 255 characters separation
1. For each purple link list, add button prefix
1. Make sure each line is under 255 characters
1. Add a list of ignored items
1. Save data to local storage to remember previous price values
1. Fix bug: undefined items in list
1. Add a list of prices per items
1. Sort items (by name, or price)
1. Add loading from multiple files into input
1. Host at tendermario.github.io/eq-purple-links

### Next

1. Add default ignores checkbox to remove things like bags from the list by default
1. Bugfix - not all values put into the prices area are numerically alphabetical
1. Add saving the same files selected to storage
1. Make tabbing to next price field possible - rearrange prices
1. Add some styling, maybe use stone UI?
1. Consider "2k" as "2000", consider "2.1k" as "2100"
1. Add an icon for the app

## Development

### Prerequisites

Node must be installed, Windows recommends using the `nvm` [installer](https://github.com/coreybutler/nvm-windows/releases) for PowerShell, but any way you grab Node I'm sure will suffice.

1. fork or clone this repo
2. Install dependencies `npm i`
3. Run the electron server `npm start`

There's a bunch of steps I undertook to get electron to run in WSL on Windows. This is probably not necessary though.

### Building the distributable/executable for release

Electron builders usually only build on a corresponding architecture (i.e. Windows x64 arch from a Windows system, Mac arm from a Mac).

To build for Windows run `npm run make`. You now should have an `.exe` distribution in the `out\make\squirrel.windows\x64` folder and an unpacked version in `out\<name>-win32-x64`.

To build for Mac, run `npm run dist` which builds to `dist` a `.dmg` Mac installer file.
