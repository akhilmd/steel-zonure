<?php

class Message
{
    private $text = NULL;
    private $convId = NULL;
    private $toId = NULL;

    public function __construct($text, $convId, $toId)
    {
        $this->setText($text);
        $this->setConvId($convId);
        $this->setToId($toId);
    }

    public function setText($text)
    {
        $this->text = $text;
    }

    public function setConvId($convId)
    {
        $this->convId = $convId;
    }

    public function setToId($toId)
    {
        $this->toId = $toId;
    }

    public function getText()
    {
        return $this->text;
    }

    public function getConvId()
    {
        return $this->convId;
    }

    public function getToId()
    {
        return $this->toId;
    }
}

?>