const express = require("express");
const animes = express.Router({mergeParams:true});
const {
  getAllAnimes,
  getOneAnime,
  createOneAnime,
  updateOneAnime,
  deleteOneAnime,
} = require("../queries/animes");


//get all animes
animes.get('/', async (req,res)=>{
  try{
const animes = await getAllAnimes()
res.status(200).json(animes)
  }catch (err){
res.status(500).json({error:err})
  }
  
})

//get one anime
animes.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
     
      const anime = await getOneAnime(id)
      if(anime.user_id){
          res.status(200).json(anime)
      } else {
          res.status(404).json({ error: "Anime Not Found" })
      }
  } catch (err) {
      res.status(500).json({ error: err })
  }
})

// Update the anime in the database
animes.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  // Validate the req body
  if (!name || !description || name.length === 0 || description.length === 0) {
    return res.status(400).json({ error: "Name and description are required and cannot be empty" });
  }

  try {
    
    const updatedAnime = await updateOneAnime(id, { name, description });

    if (updatedAnime) {
      res.status(200).json(updatedAnime);
    } else {
      res.status(404).json({ error: "Anime Not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
 // Delete the anime from the database
animes.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {

   
    const deletedAnime = await deleteOneAnime(id);

    if (deletedAnime) {
      res.status(200).json(deletedAnime);
    } else {
      res.status(404).json({ error: "Anime Not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
  
animes.post('/', async (req,res)=>{
  try{
  const { user_id } = req.params
  const newAnime = await createOneAnime({...req.body, user_id})
  res.status(400).json(newAnime)
  }catch (error){
    res.status(500).json({error: 'NOT HAPPENING, TRY AGAIN'})
  }
})



module.exports = animes;
