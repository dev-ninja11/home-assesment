# Typeahead Search Component (React, Next, TypeScript)

## List of features for this example

<ol>
<li>Up and Down arrow keys to traverse Episodes</li>
<li>Enter key to choose single Episode.
    <ol>
        <li>Closes search and shows dialog box of selected Episode</li>
        <li>Display the Title and its Director of the Episode in the search bar</li>
    </ol>
</li>
<li>Mouse click on filtered Episodes will close the search and display a dialog box of selected record. </li>
<li>If there are more than 1 letter in the search field then show times icon to clear the field in the right side of the search. 
    <ol>
        <li>Once the field is clear, programatically put the focus in the search field with useRef() hook.</li>
        <li>Open search filter results section if any key is pressed while cursor is inside the search field.</li>
    </ol>
</li>
</ol>

## Running locally in development mode

    npm install
    npm run dev

Note: If you are running on Windows run install --noptional flag (i.e. `npm install --no-optional`) which will skip installing fsevents.

## Building and deploying in production

If you wanted to run this site in production, you should install modules then build the site with `npm run build` and run it with `npm start`:

    npm install
    npm run build
    npm start

You should run `npm run build` again any time you make changes to the site.

Note: If you are already running a webserver on port 80 (e.g. Macs usually have the Apache webserver running on port 80) you can still start the example in production mode by passing a different port as an Environment Variable when starting (e.g. `PORT=3000 npm start`).
