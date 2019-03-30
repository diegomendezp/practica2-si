package ssii.practica_2.Controllers;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;



@Controller
public class MainController {
    
    @RequestMapping("/front")
    public String inicio(Map<String, Object> model) {
        return "index";
    }
    
    @RequestMapping("/profesional")
    public String profesional(Map<String, Object> model) {
        return "professional";
    }

}
