let tempID = null, tempelement = null, temprow = null;
function dothething()
{
    fetch('/data', { method: 'GET', headers: { "Content-Type": "application/json" } })
    .then( response => response.json() )
    .then( json => builder( json[ 0 ].items ));
};
function builder ( json )
{
    const tbl = document.getElementById( 'datatable' );
    tbl.innerHTML = '<tr><th>title</th><th>genre</th><th>year</th><th>directed by Zack Snyder?</th><th>edit?</th><th>delete?</th></tr>';
    console.log('ok?');
    if( json != null )
    {
        console.log('ok!');
        json.forEach(entry => 
            {
                let newRow  = '<tr id = "' + entry._movID + '">';
                    newRow += '<th>' + entry.title.toString().toUpperCase() + '</th>';
                    newRow += '<th>' + entry.genre.toString().toUpperCase() + '</th>';
                    newRow += '<th>' + entry.year + '</th>';
                    newRow += '<th>' + zackcheck( entry.title, entry.year ) + '</th>';
                    newRow += '<th><button onclick="updater(\'' + entry._movID + '\',\'' + entry.title + '\',\'' + entry.genre + '\',\'' + entry.year + '\');">edit?</button></th>';
                    newRow += '<th><button onclick="deleter(\'' + entry._movID + '\');">delete?</button></th>';
                datatable.innerHTML += newRow;
            });
    }
};
function submitter( e )
{
    const title = document.getElementById('title'), 
          genre = document.getElementById('genre'), 
           year = document.getElementById('year'), 
           json = { title: title.value, genre: genre.value, year: year.value }, 
           body = JSON.stringify(json);
    fetch( '/submit', { method: 'POST', headers: { "Content-Type": "application/json" }, body })
    .then( response => response.json())
    .then(dothething());
    return false;
};
function deleter( _movID )
{
    const json = { _movID: _movID }, 
          body = JSON.stringify( json );
    fetch( '/delete', { method: 'POST', headers: { "Content-Type": "application/json" }, body } )
    .then( response => { response.json() })
    .then( dothething() );
    return false;
};
function updater( _movID, title, genre, year )
{
    //if( tempelement != null && tempID != null ) { updatercanceller( tempID ); }
    tempID = _movID;
    tempelement = document.getElementById(_movID);
    temprow = tempelement.innerHTML;
    let newrow  = '<br><tr id = "' + _movID + '">';
        newrow += '<th><input id="titleedit' + title + '" type="text"   value="' + title + '"></th>'
        newrow += '<th><input id="genreedit' + title + '" type="text"   value="' + genre + '"></th>'
        newrow += '<th><input id= "yearedit' + title + '" type="number" value="' +  year + '"></th>'
        newrow += '<th></th>';
        newrow += '<th><button onclick="updatersubmitter(\'' + _movID + '\')">submit</button></th></tr>';
        newrow += '<th><button onclick="updatercanceller(\'' + _movID + '\')">cancel?</button></th>';
    tempelement.innerHTML += newrow;
};
function updatercanceller( _movID )
{
    /*let title  = document.getElementById( _movID ).children[0].innerHTML,
        genre  = document.getElementById( _movID ).children[1].innerHTML,
         year  = document.getElementById( _movID ).children[2].innerHTML,
       newrow  = '<tr id = "' + _movID + '">';
       newrow += '<th>' + title + '</th>';
       newrow += '<th>' + genre + '</th>';
       newrow += '<th>' + year + '</th>';
       newrow += '<th>' + zackcheck(title, genre) + '</th>';
       newrow += '<th><button onclick="updater(\'' + _movID + '\',\'' + title + '\',\'' + genre + '\',\'' + year + '\');">edit?</button></th>';
       newrow += '<th><button onclick="deleter(\'' + _movID + '\');">delete?</button></th>';*/
    tempelement.innerHTML = temprow;
    tempelement = null, tempID = null, temprow = null;
};
function updatersubmitter( _movID )
{
    let json    = { _movID: _movID,
                       title: document.getElementById( _movID ).children[7].children[0].value,
                       genre: document.getElementById( _movID ).children[8].children[0].value,
                        year: document.getElementById( _movID ).children[9].children[0].value
                    },
        body    = JSON.stringify(json);
    console.log( json.title );
    console.log( body );
    deleter( _movID );
    fetch( '/submit', { method: 'POST', headers: { "Content-Type": "application/json" }, body })
    .then( response => response.json() )
    .then( dothething() );
    tempID = null, tempelement = null, temprow = null;
}
const zackcheck = function( title, year ) {
    const years = [ 2004, 2007, 2009, 2010, 2011, 2013, 2016, 2017, 2021, 2021 ];
    const titles = [ 'DAWN OF THE DEAD', '300', 'WATCHMEN', 'LEGEND OF THE GUARDIANS: THE OWLS OF GA\'HOOLE',
                     'SUCKER PUNCH', 'MAN OF STEEL', 'BATMAN V SUPERMAN: DAWN OF JUSTICE', 'JUSTICE LEAGUE',
                     'ZACK SNYDER\'S JUSTICE LEAGUE', 'ARMY OF THE DEAD']
    const numFilms = 10;
    title = title.toString().toUpperCase();
    for ( let i = 0 ;  i < numFilms ; i++ ) { if( year == years[ i ] && title == titles[ i ] ) { return 'YES!'; } }
    return 'NO!'; };
window.onload = function() {
    const submit = document.getElementById( 'submit' );
    submit.onclick = submitter;
    dothething(); };