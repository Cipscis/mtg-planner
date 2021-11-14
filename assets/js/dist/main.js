(()=>{"use strict";const e="/api/cards";function n(...n){return new Promise((async(r,a)=>{const t=`${e}?names=${n.map(encodeURIComponent).join("|")}`,s=await fetch(t);if(s.ok){const e=await s.json();Array.isArray(e)&&e.every((e=>{return function(e){const n=e;return!(!n||"object"!=typeof n||"error"!==n.object||"string"!=typeof n.code||"number"!=typeof n.status||"string"!=typeof n.details||!(void 0===n.warnings||Array.isArray(n.warnings)&&n.warnings.every((e=>"string"==typeof e))))}(e)||"object"==typeof(n=e)&&"card"===n.object;var n}))?r(e):(console.error(e),a(new Error("Response data format unrecognised.")))}else a(new Error(`Response not ok. Status: ${s.status} ${s.statusText}`))}))}class r{name;data;#e;ready;#n;constructor(e){"string"==typeof e&&(e={name:e}),this.name=e.name,this.#e=!1,this.ready=new Promise(((e,n)=>{this.#n=n=>{this.#e=!0,e(n)}})),!0!==e.defer&&this.getData()}getData(e){return!1===this.#e&&(e?(this.data=e,this.#n(this)):async function(e){return(await n(e))[0]}(this.name).then((e=>{this.data=e,this.#n(this)}))),this.ready}}class a extends r{quantity;flags;groups;overrides;constructor(e){e.defer=!0,super(e),this.quantity=e.quantity,e.flags&&(this.flags=e.flags),e.groups&&(this.groups=e.groups),e.overrides&&(this.overrides=e.overrides)}toString(){return t.writeLine(this)}}const t={write:e=>e.cards.map(t.writeLine).join("\n"),writeLine(e){let n=`${e.quantity}x ${e.name}`;return e.flags&&(n+=Array.from(e.flags).map((e=>` *${e}*`)).join("")),e.groups&&(n+=Array.from(e.groups).map((e=>` #${e}`)).join("")),e.overrides&&(n+=Array.from(e.overrides).map((e=>` *${e.join(":")}*`)).join("")),n},read:e=>e.split("\n").map(t.readLine).filter((e=>e instanceof a)),readLine(e){const n=t.readLineFlags(e),r=t.readLineGroups(e),s=t.readLineOverrides(e),o=t.cleanLine(e,{flags:n,groups:r,overrides:s}).match(/^(\d+)x (.+)/);if(o){const e=o[2],t=parseInt(o[1],10);return new a({name:e,quantity:t,flags:n,groups:r,overrides:s})}return null},readLineFlags(e){const n=e.match(/\s+\*[^:]+?\*/g);if(n)return new Set(n.map((e=>e.replace(/^\s+\*|\*$/g,""))))},readLineGroups(e){const n=e.match(/\s+#\S+/g);if(n)return new Set(n.map((e=>e.replace(/^\s+#/,""))))},readLineOverrides(e){const n=e.match(/\s+\*.+?:.+?\*/g);if(n){const e=n.map((e=>e.replace(/^\s+\*|\*$/g,"").split(":")));if(e.every((e=>2===e.length)))return new Map(e)}},cleanLine(e,n){if(n){if(n.flags){const r=new RegExp(`\\s+\\*(${Array.from(n.flags).join("|")})\\*`,"g");e=e.replace(r,"")}if(n.groups){const r=new RegExp(`\\s+#(${Array.from(n.groups).join("|")})\\b`,"g");e=e.replace(r,"")}if(n.overrides){const r=Array.from(n.overrides).map((e=>e.join(":"))),a=new RegExp(`\\s+\\*(${r.map((e=>e.replace(/(\{|\})/g,"\\$1"))).join("|")})\\*`,"g");e=e.replace(a,"")}}return e}},s=new class{cards;ready;constructor(e){this.cards="string"==typeof e?t.read(e):e.concat(),this.ready=new Promise(((e,n)=>{Promise.all(this.cards.map((e=>e.ready))).then((()=>e(this)))})),n(...this.cards.map((e=>e.name))).then((e=>{for(let[n,r]of this.cards.entries()){const a=e[n];r.getData(a)}}))}get numCards(){return this.cards.reduce(((e,n)=>e+n.quantity),0)}toString(){return t.write(this)}}("1x Abzan Falconer\n1x Arcbond\n1x Atla Palani, Nest Tender *F*\n1x Aura Shards\n1x Beast Whisperer\n1x Bellowing Aegisaur\n1x Boros Charm\n1x Boros Garrison\n1x Boros Guildgate\n1x Boros Signet\n1x Braid of Fire\n1x Brash Taunter\n1x Cacophodon\n1x Colossal Majesty\n1x Command Tower\n1x Congregation at Dawn\n1x Death's Presence\n1x Dense Foliage\n1x Elemental Bond\n1x Enduring Scalelord\n1x Evolving Wilds\n1x Fertilid\n1x Forerunner of the Empire\n5x Forest\n1x Forgotten Ancient\n1x Fury Storm\n1x Gideon's Sacrifice\n1x Gift of Immortality\n1x Gishath, Sun's Avatar\n1x Gleam of Authority\n1x Gruul Guildgate\n1x Gruul Signet\n1x Gruul Turf\n1x Hardened Scales\n1x Hornet Nest\n1x Hungering Hydra\n1x Hydra's Growth\n1x Idol of Oblivion\n1x Illusionist's Bracers\n1x Inspiring Call\n1x Jungle Shrine\n1x Longshot Squad\n1x Marath, Will of the Wild *CMDR*\n1x Marauding Raptor\n1x Mosswort Bridge\n6x Mountain\n1x Needletooth Raptor\n1x Nomads en-Kor\n1x Opal Palace\n1x Oran-Rief, the Vastwood\n1x Overgrowth\n1x Path of Discovery\n1x Pir, Imaginative Rascal\n7x Plains\n1x Polyraptor\n1x Pyrohemia\n1x Ranging Raptors\n1x Raptor Hatchling\n1x Ripjaw Raptor\n1x Rite of Passage\n1x Rugged Highlands\n1x Seedborn Muse\n1x Selesnya Guildgate\n1x Selesnya Sanctuary\n1x Shaman en-Kor\n1x Shinewend\n1x Siegehorn Ceratops\n1x Silverclad Ferocidons\n1x Solidarity of Heroes\n1x Song of Freyalise\n1x Stone Quarry\n1x Summoner's Pact *CMC:4* *COST:{2}{G}{G}*\n1x Sungrass Prairie\n1x Swiftfoot Boots\n1x Terramorphic Expanse\n1x Timber Gorge\n1x Together Forever\n1x Tranquil Expanse\n1x Trapjaw Tyrant\n1x Ulasht, the Hate Seed\n1x Unbreakable Formation\n1x Veil of Summer\n1x Victory Chimes\n1x Wilderness Reclamation\n1x Wind-Scarred Crag"),o=new r("Forest");(async()=>{console.log(await s.ready),console.log(await o.ready)})()})();
//# sourceMappingURL=main.js.map