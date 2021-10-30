
const Fundraiser = (e) => { 


    const deletefundRaiser = () => { 
        try {
          await axios.delete(`/${id}`, {
            headers: {
              Authorization: `Bearer ${tokenSave}`,
            },
          });
        } catch (error) {
          console.log(error);
        }
    
      }
    
      //update fundraiser
      const updatefundRaiser = async (id) => {
        let NewBody = {
          userId: state2.userId,
          country,
          typee,
          targett,
          img,
          title,
          descriptionn,
        }
        try {
          const res = await axios.put(
            `/${id}`,NewBody ,
            {
              headers: {
                Authorization: `Bearer ${tokenSave}`,
              },
            }
          );
         
        } catch (error) {
          console.log(error);
        }
      };
    
    
    //get all fundraiser
      const getAllFundraiser = async () => {
        try {
          const res = await axios.get("/fundraiser");
          
        } catch (error) {
          console.log(error);
        }
      };

      return ( 

 <>
 </>
)

}

export default Fundraiser