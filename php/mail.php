<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>Contact Us</title>
</head>
<body style="font-family:tahoma; font-size:12px">
    <?php
        // receiving information
        $name=$_POST['name'];
        $from=$_POST['email'];
        $subject=$_POST['subject'];
        $message=$_POST['message']; 
        // form validation
        if (strlen($name) == 0) {
            die("Please enter your name.");
        }
        // if (strlen($email) == 0) {
        //     die("Please enter your e-mail address.");
        // }
        // if (! preg_match('/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/', $eMail)) {
        //     die("Invalid e-mail format.");
        // }
        if (strlen($subject) == 0) {
            die("Please enter the subject.");
        }
        if (strlen($message) == 0) {
            die("Please enter your message.");
        }
        // Send the form to email
        require("phpmailer/src/PHPMailer.php");
        include("phpmailer/src/SMTP.php");

        $mail = new PHPMailer;
        $mail->IsSMTP();
        $mail->Host = "smtp.gmail.com";
        $mail->SMTPAuth = true;  
        $mail->Username= "contact.leilaahmadi@gmail.com";
        $mail->Password= "RKW+bE~TrnR\3}c'@$l+";
        $mail->SMTPSecure = "tls";  
        $mail->Port = 587; 
        $mail->SetFrom($from, $name);
        $mail->AddReplyTo($from, $name);
        $mail->AddAddress('contact@leilaahmadi.com', "Leila Ahmadi");
        $mail->AddAddress('leilaahmadi@outlook.com', "Leila Ahmadi");
        $mail->Subject = $subject;
        $mail->isHTML(true);
        $body = '<html><body>';
        $body .= '<p style="font-family:calibri;">'.$message.'</p>';
        $body .= "</body></html>";
        $mail->MsgHTML($body);
        $mail->AltBody= $message;
        if(!$mail->Send()) {
            echo "Error! Your message was not sent." . $mail->ErrorInfo;
        } else {
            echo "Your message has been sent successfully!";
        }
    ?>
</body>
</html>
