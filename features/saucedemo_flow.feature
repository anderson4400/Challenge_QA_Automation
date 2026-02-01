Feature: Flujo de compra en SauceDemo

  Scenario: Login exitoso y agregar producto al carrito
    Given navegamos a la pagina de login
    When ingreso el usuario y password configurados
    Then valido que el login fue exitoso mostrando la lista de productos
    When agrego un producto al carrito
    Then valido que el carrito muestra 1 item
    And cierro sesion
