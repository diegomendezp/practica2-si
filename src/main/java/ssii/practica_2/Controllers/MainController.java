package ssii.practica_2.Controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;



@Controller
public class MainController {
    
    @RequestMapping(value="/",method = RequestMethod.GET)
    public String indexController(Model model) {
        return "home";
    }



    
}
